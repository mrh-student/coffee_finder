<html>
    <body>
    <?php
        $servername = "server_name";
        $username = "user_name";
        $password = "pw";
        $dbname = "db_name";

        // Create connection
        $conn = new mysqli($servername, $username, $password, $dbname);
        // Check connection
        if ($conn->connect_error) {
            die("Connection failed: " . $conn->connect_error);
        } 

        $sql = "SELECT * FROM coffeeshops";
        $result = $conn->query($sql);

        if ($result) {
            //output data of each row
            $objList = [];
            echo $objList;
            while($row = $result->fetch_assoc()) {
                $table = array(
                    "name"=>$row["name"],
                    "address"=>$row["address"],
                    "img"=>$row["image"],
                    "rating"=>$row["rating"],
                    "url"=>$row["url"],
                    "openSunday"=>$row["openSunday"],
                    "closeSunday"=>$row["closeSunday"],
                    "openMonday"=>$row["openMonday"],
                    "closeMonday"=>$row["closeMonday"],
                    "openTuesday"=>$row["openTuesday"],
                    "closeTuesday"=>$row["closeTuesday"],
                    "openWednesday"=>$row["openWednesday"],
                    "closeWednesday"=>$row["closeWednesday"],
                    "openThursday"=>$row["openThursday"],
                    "closeThursday"=>$row["closeThursday"],
                    "openFriday"=>$row["openFriday"],
                    "closeFriday"=>$row["closeFriday"],
                    "openSaturday"=>$row["openSaturday"],
                    "closeSaturday"=>$row["closeSaturday"]
                );
                array_push($objList, $table);
                // echo "id: " . $row["name"]. " - Name: " . $row["address"]. "<br>";
            }
            $json = json_encode($objList);
            echo $json;
        } else {
            echo "0 results";
        }
        $conn->close();
    ?>
    </body>
</html>