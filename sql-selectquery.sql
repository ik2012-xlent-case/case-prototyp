SELECT
    c_cust.id,
    c_cust.lan,
    c_cust.city,
    c_cust.org_nr,
    c_cust.avtal,
    c_cust.latitud,
    c_cust.longitud,
    c_cust.avtal_date,
    c_cust.fakturerat,
    c_cust.location_error,
    c_cust.name               AS 'cust_name',
    c_cat.short               AS 'cat_short',
    c_chain.name              AS 'chain_name',
    c_info.name               AS 'contact_name',
    c_info.phone_nr           AS 'contact_phone',
    c_adm.ansv_person,
    c_adm.id                  AS 'history_id',
    c_adm.date                AS 'history_date',
    c_adm.created_by          AS 'history_created_by',
    c_adm.activity_id         AS 'history_activity_id',
    c_adm.contact_date        AS 'history_contact_date',
    ( SELECT name FROM case_contact_info
        WHERE id IN ( SELECT contact_info FROM case_users
                        WHERE id = c_adm.ansv_person )
        LIMIT 1 )             AS 'history_ansv_name',
    ( SELECT name FROM case_contact_info
        WHERE id IN ( SELECT contact_info FROM case_users
                WHERE id = c_adm.created_by )
        LIMIT 1 )             AS 'history_created_name'    
FROM
    case_customers            c_cust,
    case_contact_info         c_info,
    case_customer_chains      c_chain,
    case_branchtillhorighet   c_branch,
    case_customer_categories  c_cat,
    case_adm_company_history  c_adm,
    case_users                c_user,
    case_user_permissions     c_perm
WHERE
    c_cust.contact_info       = c_info.id
    AND c_cust.chain_id       = c_chain.id
    AND c_branch.external_id  = c_cust.id
    AND c_branch.branch_code  = c_cat.id
    AND c_adm.company_id      = c_cust.id
    AND c_adm.created_by      = c_user.id
    AND c_user.permission     = c_perm.id