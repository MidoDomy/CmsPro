import template from './cms-navigator-tree.html.twig';
import './cms-navigator-tree.scss';

const { Component } = Shopware;
const { sort } = Shopware.Utils;

Component.extend('cms-navigator-tree', 'sw-tree', {
    template,

    data() {
        return {}
    },

    props: {
        section: {
            type: Object,
            default: null
        },
    },

    methods: {
        findById(id, checkChildren) {
            let item = this.$super('findById', id);

            /** Try to find the item in other cms sections */
            if (!item && false !== checkChildren) {
                this.$parent.$children.forEach(child => {
                    if ('cms-navigator-tree' === child.$options._componentTag)
                    {
                        let result = child.findById(id, false);
                        if (result) {
                            item = result;
                        }
                    }
                });
            }

            return item;
        },

        findTreeByParentId(parentId, checkChildren) {
            let tree = this.$super('findTreeByParentId', parentId);

            /** Try to find the item in other cms sections */
            if (!tree && false !== checkChildren) {
                this.$parent.$children.forEach(child => {
                    if ('cms-navigator-tree' === child.$options._componentTag) {
                        let result = child.findTreeByParentId(parentId, false);
                        if (result) {
                            tree = result;
                        }
                    }
                });
            }

            return tree;
        },

        getTreeItems(parentId) {
            const treeItems = this.getTreeData();

            /** Convert to tree items */
            const convertedTreeItems = [];
            treeItems.forEach((item) => {
                if (item.isDeleted) {
                    return;
                }

                if (parentId === null && typeof treeItems.find(i => i.id === item.parentId) !== 'undefined') {
                    return;
                }

                if (parentId !== null && item[this.parentProperty] !== parentId) {
                    return;
                }

                convertedTreeItems.push({
                    data: item,
                    id: item.id,
                    parentId: parentId,
                    childCount: item[this.childCountProperty],
                    children: this.getTreeItems(item.id),
                    initialOpened: true === item.initialOpened,
                    active: false,
                    activeElementId: this.routeParamsActiveElementId,
                    checked: !!this.checkItemsInitial,
                    [this.afterIdProperty]: item[this.afterIdProperty]
                });
            });

            return sort.afterSort(convertedTreeItems, this.afterIdProperty);
        },

        getTreeData() {
            const treeItems = [];

            /** Add the root element, if no parentId is set */
            const rootTreeItem = {
                id: 'root-' + this.section.id,
                name: 'Root',
                childCount: 999,
                parentId: null,
                afterId: null,
                isDeleted: false,
                initialOpened: true
            };
            treeItems.push(rootTreeItem);

            /** Load the blocks */
            this.items.forEach(block => {

                /** Default values */
                let parentId = 'root-' + this.section.id;
                let childCount = 0;

                /** Calculate the parent id */
                if (block.customFields && block.customFields.cms_parent_block_id) {
                    parentId = block.customFields.cms_parent_block_id;

                    /** We also have to check, if there is a sub section for the parent */
                    if (block.customFields.cms_sub_section) {
                        parentId = parentId + '-' + block.customFields.cms_sub_section;
                    }
                }

                /** Check for sub sections for this block */
                if (block.subSectionNames && block.subSectionNames.length > 0) {
                    block.subSectionNames.forEach(subSectionName => {
                        let subSectionNamesAlias = null;
                        if (block.subSectionNamesAlias && block.subSectionNamesAlias[subSectionName]) {
                            subSectionNamesAlias = block.subSectionNamesAlias[subSectionName];
                        }

                        treeItems.push({
                            id: block.id + '-' + subSectionName,
                            name: null !== subSectionNamesAlias ? subSectionNamesAlias : '',
                            childCount: 1,
                            parentId: block.id,
                            afterId: null,
                            isDeleted: false,
                            isSubSection: true
                        });
                    });

                    /** Cause we have sections the child count is the total of sections */
                    childCount = block.subSectionNames.length;
                } else {
                    /** Calculate the count of child tree items for blocks without sub sections */
                    childCount = this.items.filter(item => {
                        return !(!item.customFields || item.customFields.cms_parent_block_id !== block.id);
                    }).length;
                }

                treeItems.push({
                    id: block.id,
                    name: block.name ? block.name : block.type + ' - ' + childCount,
                    childCount: childCount,
                    parentId: parentId,
                    afterId: null,
                    isDeleted: false
                });
            });

            /** Set placeholder to empty sub sections */
            treeItems.forEach(block => {
                /** Abort, if it is not a sub section */
                if (!block.isSubSection) {
                    return;
                }

                /** Calculate the child count of this sub section */
                const childCount = treeItems.filter(treeItem => {
                    return treeItem.parentId === block.id;
                }).length;

                /** Add an empty tree item */
                treeItems.push({
                    id: block.id + '-empty',
                    name: this.$tc('sw-cms.navigatorTree.emptyTreeItem'),
                    childCount: 0,
                    parentId: block.id,
                    afterId: null,
                    isDeleted: false,
                    isEmptyTreeItem: true,
                    isHidden: childCount > 0
                });
            });

            return treeItems;
        },

        moveDrag(draggedComponent, droppedComponent) {
            if (!draggedComponent || !droppedComponent) {
                return;
            }

            if (draggedComponent.id === droppedComponent.id) {
                return;
            }

            /** Abort dropping in top of root */
            if ('root-' + this.section.id === droppedComponent.data.id) {
                return;
            }

            /** Abort dropping in sub section structure */
            if (droppedComponent.data && true === droppedComponent.data.isSubSection) {
                /** But, try to open the ŝub section before */
                this.openTreeById(droppedComponent.id)

                return;
            }

            this.$super('moveDrag', draggedComponent, droppedComponent);
        },

        endDrag() {
            if (!this.droppedItem) {
                this.draggedItem = null;
                return;
            }

            const oldParentId = this.draggedItem.data.parentId;
            const newParentId = this.droppedItem.data.parentId;

            this.updateSubSectionEmptyTreeItemVisibility(oldParentId);
            this.updateSubSectionEmptyTreeItemVisibility(newParentId);

            this.syncCmsBlock(this.draggedItem);
            this.moveBlockItemToOtherSectionCheck(this.draggedItem.id, newParentId);

            this.$super('endDrag');
        },

        moveBlockItemToOtherSectionCheck(movedBlockId, newParentId) {
            const swCmsSidebar = this.$parent.$parent.$parent;

            /** Make sure that we have only the id instead of something like 2c5eda067dc54479a54ebb9206fb1c3b-firstColumn */
            const rawNewParentId = newParentId.split('-')[0];

            /** Fetch the section key of the new parent and the moved item */
            let newParentSectionKey = null;
            let movedItemSectionKey = null;
            swCmsSidebar.page.sections.forEach((section, sectionKey) => {
                section.blocks.forEach(block => {
                    if (block.id === rawNewParentId) {
                        newParentSectionKey = sectionKey;
                    }

                    if (block.id === movedBlockId) {
                        movedItemSectionKey = sectionKey;
                    }
                });
            });

            /** Special-case > root drop */
            if ('root' === rawNewParentId) {
                swCmsSidebar.page.sections.forEach((section, sectionKey) => {
                    if (section.id === newParentId.split('-')[1]) {
                        newParentSectionKey = sectionKey;
                    }
                });
            }

            /** Switch the section of the block, if the keys are valid and different */
            if (null !== newParentSectionKey && null !== movedItemSectionKey && newParentSectionKey !== movedItemSectionKey) {
                /** Fetch the block by id */
                let searchedBlock = null;
                swCmsSidebar.page.sections[movedItemSectionKey].blocks.forEach((block) => {
                    if (block.id === movedBlockId) {
                        searchedBlock = block;
                    }
                });

                /** clone moved block */
                const blockClone = swCmsSidebar.cloneBlock(searchedBlock, swCmsSidebar.page.sections[newParentSectionKey].id);

                /** Remove the old block */
                const itemRemoveIndex = swCmsSidebar.page.sections[movedItemSectionKey].blocks.findIndex(i => i.id === movedBlockId);
                if (itemRemoveIndex >= 0) {
                    swCmsSidebar.page.sections[movedItemSectionKey].blocks.splice(itemRemoveIndex, 1);
                }

                /** Add the cloned block */
                swCmsSidebar.page.sections[newParentSectionKey].blocks.push(blockClone);

                /** Check for child blocks that we also need to move */
                const moveChilds = [];
                swCmsSidebar.page.sections[movedItemSectionKey].blocks.forEach((block) => {
                    if (block.customFields && block.customFields.cms_parent_block_id === movedBlockId) {
                        moveChilds.push({
                            movedBlock: block,
                            newParentId: blockClone.id
                        })
                    }
                });

                if (moveChilds.length > 0) {
                    moveChilds.forEach(moveChild => {
                        /** Set the new parent id */
                        moveChild.movedBlock.customFields.cms_parent_block_id = moveChild.newParentId;

                        /** Also move this blocks */
                        this.moveBlockItemToOtherSectionCheck(moveChild.movedBlock.id, moveChild.newParentId);
                    })
                }
            }
        },

        updateSubSectionEmptyTreeItemVisibility(treeItemId) {
            const treeItem = this.findById(treeItemId);

            /** Abort, if the tree item is no sub section */
            if (!treeItem.data || treeItem.data.isSubSection !== true) {
                return;
            }

            /** Abort, if there is no empty item for this sub section */
            const emptyTreeItem = this.findById(treeItemId + '-empty');
            if (!emptyTreeItem) {
                return;
            }

            /**
             * If the sub section has only one child (empty tree item), we have to display the empty tree item
             * Otherwise, we hide the empty tree item
             */
            emptyTreeItem.data.isHidden = treeItem.children.length > 1;
        },

        syncCmsBlock(draggedItem) {
            const blockId = draggedItem.id;
            const newParentId = draggedItem.parentId;
            const cmsBlock = this.items.find(i => i.id === blockId);

            /** Abort, if we haven't found the block or parent block */
            if (!cmsBlock) {
                return;
            }

            /** Create the customField object, if not exists */
            if (!cmsBlock.customFields) {
                cmsBlock.customFields = {};
            }

            /** Reset the parent and sub section configuration, if exists */
            if (cmsBlock.customFields.cms_parent_block_id) {
                cmsBlock.customFields.cms_parent_block_id = '';
            }

            if (cmsBlock.customFields.cms_sub_section) {
                cmsBlock.customFields.cms_sub_section = '';
            }

            if ('root-' + this.section.id !== newParentId) {
                /** Calculate the structure (structure: [id]-[section name]) */
                const parentIdStructure = newParentId.split("-");

                /** Set the parent and sub section structure */
                if (parentIdStructure[0]) {
                    cmsBlock.customFields.cms_parent_block_id = parentIdStructure[0];
                }
                if (parentIdStructure[1]) {
                    cmsBlock.customFields.cms_sub_section = parentIdStructure[1];
                }
            }

            this.syncBlockPosition();
        },

        syncBlockPosition(treeItem, position) {
            if (!treeItem) {
                treeItem = this.findById('root-' + this.section.id);
            }
            if (!position) {
                position = 0;
            }

            /** Try to fetch the cms block */
            const cmsBlock = this.items.find(i => i.id === treeItem.id);

            /** Update, if block exists */
            if (cmsBlock) {
                cmsBlock.position = position;
            }

            /** Update the children positions */
            if (treeItem.children && treeItem.children.length > 0) {
                treeItem.children.forEach(childTreeItem => {
                    this.syncBlockPosition(childTreeItem, position);
                    position++;
                });
            }
        },

        updateSorting(items) { }
    }
});
