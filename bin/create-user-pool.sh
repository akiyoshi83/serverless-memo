aws cognito-idp create-user-pool \
    --pool-name serverless-memo-pool \
    --auto-verified-attributes email \
    --alias-attributes email \
    --policies "PasswordPolicy={MinimumLength=8,RequireUppercase=false,RequireLowercase=false,RequireNumbers=false,RequireSymbols=false}" \
    ${@}

