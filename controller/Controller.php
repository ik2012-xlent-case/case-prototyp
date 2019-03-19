<?php
class Controller{
    private $model;
    private $viewhelper;

    public function __construct()
    {
        $this->viewhelper = new ViewHelper();
        $this->model = new Model();
    }
    public function getAllCustomers(){
        $result = $this->model->getAllCustomers();
        $this->viewhelper->assign('customers', $result);
        $this->viewhelper->display('./view/customertable.php');
    }
}