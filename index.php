<?php
//visa felmeddeladen
//tas bort i produktionsmilj�
error_reporting(E_ALL);
ini_set('display_errors', 1);
//iso-8859-1 s� att svenska tecken visas
header('Content-Type: text/html; charset=UTF-8; Expires: '.gmdate('D, d M Y H:i:s \G\M\T', time() + (60 * 60 * 24 * 365)));
//automat importerar alla klasser som beh�vs
//s� att du slipper har include_once anrop i fler filer f�r att komma �t en klass php filerna.
spl_autoload_register ( function ($className) {

    $pathControllers = './controller/' . $className . '.php';
    $pathModels = './model/' . $className . '.php';
    $pathViews = './view/' . $className . '.php';
    $thispath='./'.$className.'.php';
    //om dessa filerna finns i resp mapp s� inkluderar vi dem
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
//syfte med index1.php kod �r att l�sa av url f�r att avg�r
//vilka controller som skan instatsieras, vilken metod med
//tillh�rande argument som ska anropas.
//g�r en vitlista av tillg�ngliga Controllers s�
//en hackare inte via url:en kan skicka in andra
//php klasser ur php api:et och f� dem instansierade
$avialableControllers=array('Controller');
//finns det n�gon path info efter index1.php
//tex index1.php/Controller/getCarBrand/BMW
if(isset($_SERVER['PATH_INFO'])){
    //dela upp url till en array
    $pathControllerMethodArg=explode('/',$_SERVER['PATH_INFO']);
    //instansierar ett controller objekt
    //kolla av vitlista av controllers s� att vi
    //endast kan instansierar objekt som finns i den listan.
    if(in_array($pathControllerMethodArg[1],$avialableControllers)){
        $controller=new $pathControllerMethodArg[1]();
        //anropa metod med argument p� det controller objektet
        $controller->{$pathControllerMethodArg[2]}($pathControllerMethodArg[3]);
    }
    else{
        //n�gon f�rs�ker skicka in andra klasser via url:en �n de ur listan, tex
        //ett annat tillg�nglig php klass ur php api:et
        //index1.php/SplFileObject/
        //d� tar vi v�r default controller
        $controller=new Controller();
        $controller->getAllCustomers();
    }

}
else{
//det finns ingen path info s� vi s�tter instansierar en default controller och anropar l�mplig default metod
    $controller=new Controller();
    $controller->getAllCustomers();
}



?>