<?php declare(strict_types=1);

namespace CmsPro\Decorator\Core\Content\CmsPage;

use CmsPro\Core\Content\Cms\Aggregate\CmsBlock\CmsBlockRepository;
use CmsPro\Core\Content\Cms\CmsPageRepository;
use Shopware\Core\Content\Cms\Aggregate\CmsBlock\CmsBlockEntity;
use Shopware\Core\Content\Cms\Aggregate\CmsSection\CmsSectionEntity;
use Shopware\Core\Content\Cms\CmsPageEntity;
use Shopware\Core\Framework\Context;
use Shopware\Core\Framework\DataAbstractionLayer\EntityDefinition;
use Shopware\Core\Framework\DataAbstractionLayer\EntityRepositoryInterface;
use Shopware\Core\Framework\DataAbstractionLayer\Event\EntityWrittenContainerEvent;
use Shopware\Core\Framework\DataAbstractionLayer\Event\EntityWrittenEvent;
use Shopware\Core\Framework\DataAbstractionLayer\Search\AggregationResult\AggregationResultCollection;
use Shopware\Core\Framework\DataAbstractionLayer\Search\Criteria;
use Shopware\Core\Framework\DataAbstractionLayer\Search\EntitySearchResult;
use Shopware\Core\Framework\DataAbstractionLayer\Search\Filter\EqualsFilter;
use Shopware\Core\Framework\DataAbstractionLayer\Search\Filter\MultiFilter;
use Shopware\Core\Framework\DataAbstractionLayer\Search\Filter\NotFilter;
use Shopware\Core\Framework\DataAbstractionLayer\Search\IdSearchResult;
use Shopware\Core\Framework\DataAbstractionLayer\Write\CloneBehavior;

class CmsPageRepositoryDecorator implements EntityRepositoryInterface
{
    /**
     * @var EntityRepositoryInterface
     */
    private $decoratedCmsPageRepository;

    /**
     * @var CmsBlockRepository
     */
    private $cmsBlockRepository;

    /**
     * @param EntityRepositoryInterface $decoratedCmsPageRepository
     * @param CmsBlockRepository $cmsBlockRepository
     */
    public function __construct(EntityRepositoryInterface $decoratedCmsPageRepository, CmsBlockRepository $cmsBlockRepository)
    {
        $this->decoratedCmsPageRepository = $decoratedCmsPageRepository;
        $this->cmsBlockRepository = $cmsBlockRepository;
    }

    public function getDefinition(): EntityDefinition
    {
        return $this->decoratedCmsPageRepository->getDefinition();
    }

    public function aggregate(Criteria $criteria, Context $context): AggregationResultCollection
    {
        return $this->decoratedCmsPageRepository->aggregate($criteria, $context);
    }

    public function searchIds(Criteria $criteria, Context $context): IdSearchResult
    {
        return $this->decoratedCmsPageRepository->searchIds($criteria, $context);
    }

    public function clone(string $id, Context $context, ?string $newId = null, ?CloneBehavior $behavior = null): EntityWrittenContainerEvent
    {
        /** Load the original cms page */
        $originalCmsPage = $this->getWithAssociations($id);

        /** @var CmsSectionEntity $originalSection */
        foreach($originalCmsPage->getSections() as $originalSection) {
            /** @var CmsBlockEntity $originalBlock */
            foreach($originalSection->getBlocks() as $originalBlock) {
                $originalCustomFields = $originalBlock->getCustomFields();
                if (null !== $originalCustomFields && !empty($originalCustomFields['cms_parent_block_id'])) {
                    /** Fetching the referenced original cms parent block */
                    /** @var CmsBlockEntity $referencedOriginalBlockEntity */
                    $referencedOriginalBlockEntity = $this->cmsBlockRepository->get($originalCustomFields['cms_parent_block_id']);

                    /** Temporary save of the block id */
                    $this->cmsBlockRepository->update([[
                        'id' => $referencedOriginalBlockEntity->getId(),
                        'customFields' => [
                            'cms_tmp_id' => $referencedOriginalBlockEntity->getId()
                        ]
                    ]]);
                }
            }
        }

        /** Run the core clone process */
        $entityWrittenContainerEvent = $this->decoratedCmsPageRepository->clone($id, $context, $newId, $behavior);

        /** Fetch the new id */
        if (null === $newId) {
            /** @var EntityWrittenEvent $entityWrittenEvent */
            $entityWrittenEvent = $entityWrittenContainerEvent->getEvents()->first();
            $newId = $entityWrittenEvent->getIds()[0];
        }

        /** Load the original and cloned cms page */
        $clonedCmsPage = $this->getWithAssociations($newId);

        /** @var CmsSectionEntity $clonedSection */
        foreach($clonedCmsPage->getSections() as $clonedSection) {
            /** @var CmsBlockEntity $clonedBlock */
            foreach($clonedSection->getBlocks() as $clonedBlock) {
                $customFields = $clonedBlock->getCustomFields();
                if (null !== $customFields && !empty($customFields['cms_parent_block_id'])) {
                    /** Fetching the referenced cms parent block */
                    /** @var CmsBlockEntity $referencedBlockEntity */
                    $referencedBlockEntity = $this->cmsBlockRepository->get($customFields['cms_parent_block_id']);

                    /** Fetch the cloned parent block */
                    $criteria = new Criteria();
                    $criteria->addFilter(
                        new MultiFilter(
                            MultiFilter::CONNECTION_AND,
                            [
                                new EqualsFilter('customFields.cms_tmp_id', $referencedBlockEntity->getId()),
                                new NotFilter(
                                    NotFilter::CONNECTION_AND,
                                    [
                                        new EqualsFilter('id', $referencedBlockEntity->getId())
                                    ]
                                )
                            ]
                        )

                    );

                    /** @var CmsBlockEntity $clonedParentBlock */
                    $clonedParentBlock = $this->cmsBlockRepository->search($criteria)->first();
                    if (null !== $clonedParentBlock) {
                        $this->cmsBlockRepository->update([[
                            'id' => $clonedBlock->getId(),
                            'customFields' => [
                                'cms_parent_block_id' => $clonedParentBlock->getId()
                            ]
                        ]]);
                    }
                }
            }
        }

        /** Remove the temporary fields */
        $criteria = new Criteria();
        $criteria->addFilter(
                new NotFilter(
                    NotFilter::CONNECTION_AND,
                    [
                        new EqualsFilter('customFields.cms_tmp_id', null)
                    ]
                )
        );

        $blockCollectionWithTmp = $this->cmsBlockRepository->search($criteria);
        /** @var CmsBlockEntity $blockEntityWithTmp */
        foreach($blockCollectionWithTmp as $blockEntityWithTmp) {
            $customFields = $blockEntityWithTmp->getCustomFields();
            if(isset($customFields['cms_tmp_id'])) {
                $customFields['cms_tmp_id'] = '';
            }

            $this->cmsBlockRepository->update([[
                'id' => $blockEntityWithTmp->getId(),
                'customFields' => $customFields
            ]]);
        }

        return $entityWrittenContainerEvent;
    }

    public function search(Criteria $criteria, Context $context): EntitySearchResult
    {
        return $this->decoratedCmsPageRepository->search($criteria, $context);
    }

    public function update(array $data, Context $context): EntityWrittenContainerEvent
    {
        return $this->decoratedCmsPageRepository->update($data, $context);
    }

    public function upsert(array $data, Context $context): EntityWrittenContainerEvent
    {
        return $this->decoratedCmsPageRepository->upsert($data, $context);
    }

    public function create(array $data, Context $context): EntityWrittenContainerEvent
    {
        return $this->decoratedCmsPageRepository->create($data, $context);
    }

    public function delete(array $ids, Context $context): EntityWrittenContainerEvent
    {
        return $this->decoratedCmsPageRepository->delete($ids, $context);
    }

    public function createVersion(string $id, Context $context, ?string $name = null, ?string $versionId = null): string
    {
        return $this->decoratedCmsPageRepository->createVersion($id, $context, $name, $versionId);
    }

    public function merge(string $versionId, Context $context): void
    {
        $this->decoratedCmsPageRepository->merge($versionId, $context);
    }

    /**
     * @param $id
     * @return CmsPageEntity|null
     */
    public function getWithAssociations($id): ?CmsPageEntity
    {
        $criteria = new Criteria([ $id ]);

        $criteria->addAssociations([
            'sections',
            'sections.blocks'
        ]);

        return $this->search(
            $criteria,
            Context::createDefaultContext()
        )->first();
    }
}
