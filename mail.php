<?php
		$name=$_REQUEST['name'];
		$email=$_REQUEST['email'];
		$message=$_REQUEST['message'];
		
		$message1="
		<html>
			<head></head>
			<body>
				<table border='1px'>
					<tr>
						<th colspan='2' style='color:#0000FF;'>Portfolio contact</th>
					</tr>
					<tr>
						<td style='color:#0000FF;'><b>Name</b></td>
						<td>".$name."</td>
					</tr>
					<tr>
						<td style='color:#0000FF;'><b>Email</b></td>
						<td>".$email."</td>
					</tr>
					<tr>
						<td style='color:#0000FF;'><b>Message</b></td>
						<td>".$message."</td>
					</tr>
				</table>
			</body>		
		</html>";
		
		$headers = "MIME-Version: 1.0" . "\r\n";
		$headers .= "Content-type:text/html;" . "\r\n";
		 
		mail("milos.medic.pvt@gmail.com","Portfolio contact",$message1,$headers);
		
		echo("<div class='alert alert-success'><button type='button' class='close' data-dismiss='alert' aria-hidden='true'>×</button><strong>Your message has been sent. </strong></div>");
?>
