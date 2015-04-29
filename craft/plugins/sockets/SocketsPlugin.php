<?php
namespace Craft;
use Redis;
use SocketIO\Emitter;

class SocketsPlugin extends BasePlugin
{

	function getName()
	{
		return Craft::t('Sockets');
	}

	function getVersion()
	{
		return '1.0';
	}

	function getDeveloper()
	{
		return 'Rob Erskine';
	}

	function getDeveloperUrl()
	{
		return 'http://roberskine.com';
	}

	function hasCpSection()
    {
        return true;
    }
    
    public function registerCpRoutes()
    {
        return array(

    	//user this area for custom CP routes

        );

	}	

    // Thanks Page - Feel free to remove.
    public function onAfterInstall()
    {
        //craft()->request->redirect(UrlHelper::getCpUrl('/casper/thanks/'));
    }
	
	public function init() {
		craft()->on('entries.onSaveEntry', function($entry, $isNewEntry) {
			if ($isNewEntry) {
				$redis = new Redis(); // Using the Redis extension provided client
				$redis->connect('127.0.0.1', '6379');
				$emitter = new SocketIO\Emitter($redis);
				$emitter->emit('new photo', json_encode($entry));
			}
		});
	}
}
