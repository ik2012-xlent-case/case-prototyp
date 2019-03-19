<?php
$history_activites = array(
    1 => 'Övrigt',
    2 => 'Kundbesök',
    3 => 'Kontakt (telefon)',
    4 => 'Support (telefon)',
    5 => 'Sälj (hos kund)',
    6 => 'Sälj (telefon)',
    7 => 'Återkontakt',
    8 => 'Bokat möte', 
    9 => 'Fel',
    10 => 'Kontakt (epost)', 
    11 => 'Support (epost)',
    12 => 'Sälj (ej intresserad)',
    13 => 'Sälj (ej svar)'
);

?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <link rel="icon" type="image/x-icon" href="./favicon.ico">
    <link rel="stylesheet" href="css/bootstrap.css">
    <link rel="stylesheet" href="css/style.css">
</head>
<body>

<div class="jumbotron jumbotron-fluid">
    <div class="container" style="display: flex; justify-content: center;">
        <img src="img/logo.png">
    </div>
</div>

<div class="container-fluid" style="padding: 0;">
    <nav class="navbar navbar-expand navbar-dark" id="header" style="background-color: #1187B8">
        <div class="col-sm-10">
            <span class="form-inline" style="padding-left: 35px">
                <input type="text" class="form-control" placeholder="Sök.." id="search-field">
            </span>
        </div>
        <div class="col-sm-2">
            <form class="form-inline">
                <button class="btn btn-primary" id="openForm" style="background-color: #BF0F0F; border-color: #BF0F0F" type="button">Avancerad filtrering</button>
            </form>
        </div>
    </nav>
    <div style="display: none; margin-top: 50px; margin-bottom: 50px"  id="adv-search"></div>
    <div style="margin-top: 15px; margin-bottom: 15px; display: flex; justify-content: center" id="cust">
        <div class="col-11">
            <table id="tbl_kundlista" class="table table-hover">
                <thead>
                    <tr class="gridhead">
                        <th scope="col" id="table-id">#</th>
                        <th scope="col" id="table-företag">Företag</th>
                        <th scope="col" id="table-ort">Ort</th>
                        <th scope="col" id="table-län">Län</th>
                        <th scope="col" id="table-orgnr">Orgnr</th>
                        <th scope="col" id="table-karta">Karta</th>
                        <th scope="col" id="table-bransch">Bransch</th>
                        <th scope="col" id="table-avtal">Avtal</th>
                        <th scope="col" id="table-fakturerat">Fakturerat</th>
                        <th scope="col" id="table-kontaktperson">Kontaktperson</th>
                        <th scope="col" id="table-telefon">Telefon</th>
                        <th scope="col" id="table-historik">Senaste historik</th>
                        <th scope="col" id="table-historik"> </th>
                    </tr>
                </thead>
                <tbody id="customers" class="">
        <?php
        $rowshade = ' class="rowshade"';
        if ( is_array( $customers ) ) {
            foreach ($customers as $index=>$customer) {
                if ($customer['avtal'] == 2) {
                    $avtal = '<span class="greentext clickable" onclick="create_pdf(\''. $customer['id'] . '_avtal\')">Ja</span>';
                    $avtals_info = 'Avtal godkänt ' . $customer['avtal_date'] . '.<br />(klicka för att ladda ner pdf)';
                } else {
                    $avtal = '<span class="redtext">-</span>';
                    $avtals_info = 'Ej godkänt avtal';
                }
                if($customer['fakturerat'] == 2){
                    $faktura = '<span class="greentext">Ja</span>';
                } else {
                    $faktura = '<span class="redtext">-</span>';
                }

                $chain_name = $customer['chain_name'];
                if ($chain_name) {
                    $chain_name = ' (' . $chain_name . ')';
                }
                if (!$customer['location_error']) {
                    $loc_error_color = 'green';
                } else if ($customer['location_error'] == 2) {
                    $loc_error_color = 'orange';
                } else {
                    $loc_error_color = 'red';
                }
                if(is_numeric($customer['longitud']) && is_numeric($customer['latitud'])){
                    $karta = 'Ja';
                }
                else{
                    $karta = 'Nej';
                }
                $historik_btn = "<span></span>";
                if ($customer['history_id']) {
                    if ( ( $customer['history_contact_date'] && $customer['history_contact_date'] != '0000-00-00' &&
                        ( $customer['history_activity_id'] == 7 || $customer['history_activity_id'] == 8 ))
                        || ( $customer['history_activity_id'] > 11 || $customer['history_activity_id'] < 7 )) {

                            $latest_historik = '<strong class="color' . $customer['history_activity_id'] . 'text">' . $history_activites[$customer['history_activity_id']] .'</strong>';
                            $historik_btn = '<button class="history-btn btn btn-primary btn-small" style="background-color: #11789f; border-color: #11789f">Historik</button>';
                            
                            if ( $customer['history_contact_date'] && $customer['history_contact_date'] != '0000-00-00' ){
                                $latest_historik .= '<br>' . $customer['history_contact_date'];
                            }
                            if ($customer['ansv_person'] && ( $customer['history_activity_id'] == 7 OR $customer['history_activity_id'] == 8 )) {
                                $latest_historik .= ' ' . $customer['history_ansv_name'];
                            }
                            else if ( $customer['history_created_by'] ) {
                                $latest_historik .= '<br>' . $customer['history_date'] . ' ' .  $customer['history_created_name'];
                            }
                    }
                    else {
                        $latest_historik = '<span class="redtext">-</span>';
                    }
                }
                else {
                    $latest_historik = '<span class="redtext">-</span>';
                }

            
                if ($customer['org_nr']) {
                    $orgnr = '<a href="http://www.allabolag.se/' . preg_replace("/[^0-9]/", "", $customer['org_nr']) . '" class="clickable_b blacktext" target="_blank">' . $customer['org_nr'] . '</a>';
                } else {
                    $orgnr = '';
                }
                ?>
                    <tr>
                        <td><?=$index + 1?></td>
                        <td class="clickable"><span class="company_name"><?= $customer['cust_name'] . $chain_name ?></span></td>
                        <td class="company_city"><?= $customer['city'] ?></td>
                        <td class="company_lan"><?= $customer['lan'] ?></td>
                        <td class="company_orgnr"><?= $orgnr ?></td>
                        <td class="company_map <?= $loc_error_color ?>text"><?= $karta ?></td>
                        <td><?= ucfirst($customer['cat_short']) ?></td>
                        <td><?= $avtal ?></td>
                        <td class="company_fak"><?=$faktura?></td>
                        <td class="company_contact"><?= $customer['contact_name'] ?></td>
                        <td class="company_phone"><?= $customer['contact_phone'] ?></td>
                        <td><span class=""><?= $latest_historik ?></span></td>
                        <td><span class=""><?= $historik_btn ?></span></td>
                    </tr>
                <?php
            }
        }?>
                </tbody>
            </table>
        </div>
    </div>
    <script src="js/jquery.js"></script>
    <script src="js/bootstrap.bundle.js"></script>
    <script src="js/main.js"></script>
    <?php
    $time = round((microtime(true) - $_SERVER["REQUEST_TIME_FLOAT"])*1000);
    echo "Finished in $time ms\n";
    ?>
</body>
</html>