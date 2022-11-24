<?php declare(strict_types=1);

namespace CmsPro\Core\Content\Cms\Resolver\Struct;

use CmsPro\Core\Foundation\Struct\DefaultStruct;
use Shopware\Core\Content\Category\CategoryEntity;
use Shopware\Core\Content\Cms\SalesChannel\Struct\ImageStruct;
use Shopware\Core\Content\Media\MediaEntity;

class DreiscCmsCategoryTeaserResolverStruct extends DefaultStruct
{
    /**
     * @var MediaEntity|null
     */
    protected $media;

    /**
     * @var CategoryEntity|null
     */
    protected $category;

    /**
     * @param MediaEntity|null $media
     * @param CategoryEntity|null $category
     */
    public function __construct(?MediaEntity $media = null, ?CategoryEntity $category = null)
    {
        $this->media = $media;
        $this->category = $category;
    }

    /**
     * @return MediaEntity|null
     */
    public function getMedia(): ?MediaEntity
    {
        return $this->media;
    }

    /**
     * @param MediaEntity|null $media
     * @return DreiscCmsCategoryTeaserResolverStruct
     */
    public function setMedia(?MediaEntity $media): DreiscCmsCategoryTeaserResolverStruct
    {
        $this->media = $media;
        return $this;
    }

    /**
     * @return CategoryEntity|null
     */
    public function getCategory(): ?CategoryEntity
    {
        return $this->category;
    }

    /**
     * @param CategoryEntity|null $category
     * @return DreiscCmsCategoryTeaserResolverStruct
     */
    public function setCategory(?CategoryEntity $category): DreiscCmsCategoryTeaserResolverStruct
    {
        $this->category = $category;
        return $this;
    }
}
