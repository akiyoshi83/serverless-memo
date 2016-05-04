UserPoolId=$1
shift
IdentityPoolId=$1
shift

aws cognito-idp delete-user-pool \
    --user-pool-id $UserPoolId \
    ${@}

aws cognito-identity delete-identity-pool \
    --identity-pool-id $IdentityPoolId \
    ${@}

