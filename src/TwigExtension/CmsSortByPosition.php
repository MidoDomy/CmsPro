<?php declare(strict_types=1);

namespace CmsPro\TwigExtension;

use Twig\Extension\AbstractExtension;
use Twig\TwigFilter;

class CmsSortByPosition extends AbstractExtension
{
    public function getFilters()
    {
        return [
            new TwigFilter('cmsSortByPosition', [$this, 'sortByPosition'], ['needs_context' => true]),
        ];
    }

    public function sortByPosition($twigContext, $elements)
    {
        usort($elements, function ($a, $b) {
            $positionA = !empty($a['position']) ? (float) $a['position'] : 0;
            $positionB = !empty($b['position']) ? (float) $b['position'] : 0;

            return $positionA > $positionB;
        });

        return $elements;
    }
}
