<?php
namespace Craft;

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

}
