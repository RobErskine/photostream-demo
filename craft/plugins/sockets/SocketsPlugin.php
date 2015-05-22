<?php
namespace Craft;
use Aws\S3\S3Client;
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


    public function init()
    {
        // craft()->on('assets.onBeforeUploadAsset', function (Event $event) {
        //     $event->performAction = false;
        //     $s3Client = S3Client::factory([
        //         'credentials' => [
        //             'key'    => 'AKIAIUGVG473J3GWNYLA',
        //             'secret' => '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'
        //         ]
        //     ]);
        //     $result = $s3Client->putObject([
        //         'Bucket' => 'martinwedding',
        //         'Key'    => $event->params['filename'],
        //         'SourceFile' => $event->params['path'],
        //         'ACL'          => 'public-read',
        //     ]);

        //     $entry = new EntryModel();
        //     $entry->sectionId = 3;
        //     // $entry->typeId    = 1;
        //     $entry->authorId  = 1;
        //     $entry->enabled   = true;

        //     $entry->getContent()->eventPhotoLink = $result->toArray()['ObjectURL'];

        //     $success = craft()->entries->saveEntry($entry);
        // });

        craft()->on('assets.onSaveAsset', function (Event $event) {
            $asset = $event->params['asset'];
            $redis = new \Redis(); // Using the Redis extension provided client
            $redis->connect('127.0.0.1', '6379');
            $emitter = new Emitter($redis);
            $emitter->emit('photo', $asset->getUrl());
            $redis->close();

            $image = new \Imagick($asset->getUrl());
            $orientation = $image->getImageOrientation();
            switch($orientation) {
                case \Imagick::ORIENTATION_BOTTOMRIGHT:
                    $image->rotateimage("#000", 180); // rotate 180 degrees
                break;

                case \Imagick::ORIENTATION_RIGHTTOP:
                    $image->rotateimage("#000", 90); // rotate 90 degrees CW
                break;

                case \Imagick::ORIENTATION_LEFTBOTTOM:
                    $image->rotateimage("#000", -90); // rotate 90 degrees CCW
                break;
            }
            $image->setImageOrientation(\Imagick::ORIENTATION_TOPLEFT);
            $image->writeImage('/var/www/html/event-photos/' . $asset->filename);
        });
    }
}
