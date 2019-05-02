<?php

$x = preg_replace("/[\. \(\)\-]/", "", $_REQUEST['x']);
$y = preg_replace("/[\. \(\)\-]/", "", $_REQUEST['y']);

$theX = (rand()%$x);
$theY = (rand()%$y);

$response=$theX.",".$theY;
echo $response;

?>