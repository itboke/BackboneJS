<?php


		//设置接受数据的格式

		header('Content-Type:application/json;charset=utf-8');


		//保存客户端发送过来的JSON数据

		$date = json_decode(file_get_contents("php://input"));

		//返回JSON数据
		die(json_encode(array('code'=>'1')));

?>