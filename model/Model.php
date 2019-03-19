<?php
class Model{

    public function getAllCustomers(){
        $pdo = $this->getPDOConnection();
        $query = $pdo->prepare("CALL case_getAllCustomers");
        $query->execute();
        $result = $query->fetchAll();

        return $result;
    }

    private function getPDOConnection(): PDO
    {
        $dsn = "mysql:host=edu-mysql.du.se;dbname=db-h16ludas";
        $user = "h16ludas";
        $pass = "VQnBEevCQVY4GUys";

        $options = array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8mb4");
        $pdo = null;
        try {
            $pdo = new PDO($dsn, $user, $pass, $options);
            $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            return $pdo;
        } catch (PDOException $ex) {
            echo "PDOError exception: ", $ex->getMessage();
            $pdo = null;
            die();
        }
    }
}