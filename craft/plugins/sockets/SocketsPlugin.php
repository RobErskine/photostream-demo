<?php
namespace Craft;
use Aws\S3\S3Client;

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

    public function init()
    {
        craft()->on('assets.onBeforeUploadAsset', function (Event $event) {
            $event->performAction = false;
            $s3Client = S3Client::factory([
                'credentials' => [
                    'key'    => 'AKIAIUGVG473J3GWNYLA',
                    'secret' => '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'
                ]
            ]);
            $result = $s3Client->putObject([
                'Bucket' => 'martinwedding',
                'Key'    => $event->params['filename'],
                'SourceFile' => $event->params['path'],
                'ACL'          => 'public-read',
            ]);

            $entry = new EntryModel();
            $entry->sectionId = 3;
            // $entry->typeId    = 1;
            $entry->authorId  = 1;
            $entry->enabled   = true;

            // $entry->getContent()->title = $event->params['filename'];
            $entry->getContent()->eventPhotoLink = $result->data['ObjectURL'];

            // $entry->setContentFromPost(array(
            //     'body' => "<p>I can’t believe I literally just called this “Hello World!”.</p>",
            // ));

            $success = craft()->entries->saveEntry($entry);
        });
    }
}
