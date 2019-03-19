<?php
//inspired by smarty template https://www.smarty.net/crash_course
//syftet med ViewHelper är att underlätta för och hjälpa Controllern
//att sätt det data och den vy som ska presenterar datat från modellen.
class ViewHelper{
    //en array som håller det data som ska visa i vyerna/templates
    private $viewData;
    public function __construct(){
        $this->viewData=array();
    }
    public function assign($key,$value){

        $this->viewData[$key]=$value;
    }
    public function display($phpViewPage){
        if(file_exists($phpViewPage)){
            //extract gör så att key värdens namn i arrayen blir tillgängliga så att vi kan använda dem och dess data i vyn för presentation.
            extract($this->viewData);
            include_once($phpViewPage);
        }
    }
}


?>