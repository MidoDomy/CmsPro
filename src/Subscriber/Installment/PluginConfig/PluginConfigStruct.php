<?php declare(strict_types=1);

namespace CmsPro\Subscriber\Installment\PluginConfig;

use CmsPro\Core\Foundation\Struct\DefaultStruct;

class PluginConfigStruct extends DefaultStruct
{
    /**
     * @var string
     */
    protected $googleApiKey;

    /**
     * @param string $googleApiKey
     */
    public function __construct(string $googleApiKey)
    {
        $this->googleApiKey = $googleApiKey;
    }

    /**
     * @return string
     */
    public function getGoogleApiKey(): string
    {
        return $this->googleApiKey;
    }

    /**
     * @param string $googleApiKey
     * @return PluginConfigStruct
     */
    public function setGoogleApiKey(string $googleApiKey): PluginConfigStruct
    {
        $this->googleApiKey = $googleApiKey;
        return $this;
    }
}
