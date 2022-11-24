<?php declare(strict_types=1);

namespace CmsPro\Core\Content\Cms\Resolver;

use CmsPro\Core\Content\Cms\Resolver\Struct\DreiscCmsCategoryTeaserResolverStruct;
use Shopware\Core\Content\Category\CategoryDefinition;
use Shopware\Core\Content\Cms\Aggregate\CmsSlot\CmsSlotEntity;
use Shopware\Core\Content\Cms\DataResolver\CriteriaCollection;
use Shopware\Core\Content\Cms\DataResolver\Element\ElementDataCollection;
use Shopware\Core\Content\Cms\DataResolver\ResolverContext\ResolverContext;
use Shopware\Core\Content\Cms\SalesChannel\Struct\ImageStruct;
use Shopware\Core\Content\Media\Cms\AbstractDefaultMediaResolver;
use Shopware\Core\Content\Media\Cms\ImageCmsElementResolver;
use Shopware\Core\Framework\DataAbstractionLayer\Search\Criteria;

class DreiscCmsCategoryTeaserResolver
{
    /**
     * @var ImageCmsElementResolver
     */
    protected $imageCmsElementResolver;

    /**
     * @param ImageCmsElementResolver $imageCmsElementResolver
     */
    public function __construct(ImageCmsElementResolver $imageCmsElementResolver)
    {
        $this->imageCmsElementResolver = $imageCmsElementResolver;
    }

    public function getType(): string
    {
        return 'dreisc-cms-category-teaser';
    }

    public function collect(CmsSlotEntity $slot, ResolverContext $resolverContext): ?CriteriaCollection
    {
        $criteriaCollection = $this->imageCmsElementResolver->collect($slot, $resolverContext);
        if (null === $criteriaCollection) {
            return null;
        }

        $config = $slot->getFieldConfig();
        $categoryIdConfig = $config->get('categoryId');

        if (!$categoryIdConfig || $categoryIdConfig->isMapped() || $categoryIdConfig->getValue() === null) {
            return null;
        }

        $criteriaCollection->add(
            'category_' . $slot->getUniqueIdentifier(),
            CategoryDefinition::class,
            new Criteria([ $categoryIdConfig->getValue() ])
        );

        return $criteriaCollection;
    }

    public function enrich(CmsSlotEntity $slot, ResolverContext $resolverContext, ElementDataCollection $result): void
    {
        $this->imageCmsElementResolver->enrich($slot, $resolverContext, $result);

        /** @var ImageStruct $imageStruct */
        $imageStruct = $slot->getData();
        $entitySearchResult = $result->get('category_' . $slot->getUniqueIdentifier());

        $categoryEntity = null;
        if ($entitySearchResult && $entitySearchResult->first()) {
            $categoryEntity = $entitySearchResult->first();
        }

        $dreiscCmsCategoryTeaserResolverStruct = new DreiscCmsCategoryTeaserResolverStruct(
            $imageStruct->getMedia(),
            $categoryEntity
        );

        $slot->setData($dreiscCmsCategoryTeaserResolverStruct);
    }
}
