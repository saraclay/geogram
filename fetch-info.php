<?php

$info = $_GET['info'];

$url = 'https://api.instagram.com/v1/users/' .$info. '/?access_token=17177217.f59def8.d29629c1eb264661958417cfde80b3bf';

$json = file_get_contents($url);

echo $json;

?>
