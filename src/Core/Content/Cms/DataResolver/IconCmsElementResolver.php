<?php declare(strict_types=1);

namespace CmsPro\Core\Content\Cms\DataResolver;

use Shopware\Core\Content\Media\Cms\ImageCmsElementResolver;

class IconCmsElementResolver extends ImageCmsElementResolver
{
    public function getType(): string
    {
        return 'icon';
    }
}
