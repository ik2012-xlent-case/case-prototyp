<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
header('Content-Type: text/html; charset=UTF-8');
spl_autoload_register ( function ($className) {

    $pathControllers = './controller/' . $className . '.php';
    $pathModels = './model/' . $className . '.php';
    $pathViews = './view/' . $className . '.php';
    $thispath='./'.$className.'.php';

    if (file_exists($pathControllers)) {
        include_once $pathControllers;
    }
    if (file_exists($pathModels )) {
        include_once $pathModels ;
    }
    if (file_exists($pathViews )) {
        include_once $pathViews ;
    }
    if(file_exists($thispath)){
        include_once $thispath;
    }
});

$availableControllers = array('Controller');

if(isset($_SERVER['PATH_INFO'])){

    $pathControllerMethodArg=explode('/',$_SERVER['PATH_INFO']);

    if(in_array($pathControllerMethodArg[1],$availableControllers)){
        $controller = new $pathControllerMethodArg[1]();
        $controller->{$pathControllerMethodArg[2]}($pathControllerMethodArg[3]);
    }
    else{
        $controller=new Controller();
        $controller->getAllCustomers();
    }

}
else{
    $controller=new Controller();
    $controller->getAllCustomers();
}



?>