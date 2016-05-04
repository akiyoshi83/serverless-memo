id=$(shift)
aws cognito-idp delete-user-pool \
    --user-pool-id $id \
    ${@}

