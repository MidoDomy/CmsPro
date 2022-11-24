import template from './cms-navigator-tree-item.html.twig';
import './cms-navigator-tree-item.scss';

const { Component } = Shopware;

Component.extend('cms-navigator-tree-item', 'sw-tree-item', {
    template,

    data() {
        return {}
    },

    computed: {
        styling() {
            return {
                'is--root': 'root' === this.item.id.split('-')[0],
                'is--hidden': this.item.data.isHidden,

                /** Shopware default */
                'is--dragging': this.isDragging,
                'is--active': this.active,
                'is--opened': this.isOpened,
                'is--no-children': this.item.childCount <= 0,
                'is--marked-inactive': this.markInactive && !this.item.data.active,
                'is--focus': this.shouldFocus && this.activeFocusId === this.item.id
            };
        },

        isSystemDefaultLanguage() {
            return Shopware.State.getters['context/isSystemDefaultLanguage']
        },

        dragConf() {
            /** Default values */
            let disableDrag = false;

            /** Disable drag for sub sections */
            if (true === this.item.data.isSubSection) {
                disableDrag = true;
            }

            /** Disable drag for empty tree items */
            if (true === this.item.data.isEmptyTreeItem) {
                disableDrag = true;
            }

            return {
                delay: 300,
                validDragCls: null,
                dragGroup: 'sw-tree-item',
                data: this.item,
                onDragStart: this.dragStart,
                onDragEnter: this.onMouseEnter,
                onDrop: this.dragEnd,
                preventEvent: true,
                disabled: disableDrag
            };
        },

        /** Fix: Replace sw-tree with cms-navigator-tree */
        parentScope() {
            let parentNode = this.$parent;
            // eslint-disable-next-line
            while (parentNode.$options._componentTag !== 'cms-navigator-tree') {
                parentNode = parentNode.$parent;
            }
            return parentNode;
        }
    },

    methods: {
        onLocateBlock() {
            const block = this.parentScope.items.get(this.item.id);
            if (!block) {
                return;
            }

            Shopware.State.dispatch('cmsPageState/setBlock', block);
        },

        onEditBlock() {
            const block = this.parentScope.items.get(this.item.id);
            if (!block) {
                return;
            }

            Shopware.State.dispatch('cmsPageState/setBlock', block);

            this.parentScope.$emit('page-config-open', 'itemConfig');
        },

        onBlockDuplicate() {
            const block = this.parentScope.items.get(this.item.id);
            if (!block) {
                return;
            }

            this.parentScope.$emit('block-duplicate', block);
        },

        onBlockDelete() {
            const block = this.parentScope.items.get(this.item.id);
            if (!block) {
                return;
            }

            this.parentScope.$emit('block-delete', block);
        }
    }
});
