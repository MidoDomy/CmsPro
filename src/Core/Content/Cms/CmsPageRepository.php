<?php declare(strict_types=1);

namespace CmsPro\Core\Content\Cms;

use CmsPro\Core\Foundation\Dal\EntityRepository;
use Shopware\Core\Content\Cms\CmsPageEntity;
use Shopware\Core\Framework\DataAbstractionLayer\Search\Criteria;
use Shopware\Core\Framework\Context;

/**
* @method CmsPageEntity    get(string $id, array $associations = null, ?Context $context = null, $disableCache = false)
* @method CmsPageSearchResult    search(Criteria $criteria, Context $context = null, $disableCache = false)
*/
class CmsPageRepository extends EntityRepository
{

}

