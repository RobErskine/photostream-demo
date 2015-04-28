<?php

/**
 * General Configuration
 *
 * All of your system's general configuration settings go in here.
 * You can see a list of the default settings in craft/app/etc/config/defaults/general.php
 */

return array(
    '*' => array(
        'omitScriptNameInUrls' => true,
    ),
    '.dev' => array(
        'devMode' => true,
        'environmentVariables' => array(
            'siteUrl'        => 'http://photostream-demo.personal.dev/',
            'fileSystemPath' => '/Users/roberskine/Sites/personal/photostream-demo/html/',
        )
    )
);