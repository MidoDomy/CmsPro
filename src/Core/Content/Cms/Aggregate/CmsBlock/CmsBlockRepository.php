<?php declare(strict_types=1);

namespace CmsPro\Core\Content\Cms\Aggregate\CmsBlock;

use CmsPro\Core\Foundation\Dal\EntityRepository;
use Shopware\Core\Framework\DataAbstractionLayer\Search\Criteria;
use Shopware\Core\Framework\Context;

/**
* @method CmsBlockEntity    get(string $id, array $associations = null, ?Context $context = null, $disableCache = false)
* @method CmsBlockSearchResult    search(Criteria $criteria, Context $context = null, $disableCache = false)
*/
class CmsBlockRepository extends EntityRepository
{
}

