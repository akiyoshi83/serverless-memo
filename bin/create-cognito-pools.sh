UserPoolId=$(aws cognito-idp create-user-pool \
    --pool-name serverless-memo-user-pool \
    --auto-verified-attributes email \
    --alias-attributes email \
    --policies "PasswordPolicy={MinimumLength=8,RequireUppercase=false,RequireLowercase=false,RequireNumbers=false,RequireSymbols=false}" \
    --query "UserPool.Id" \
    --output text \
    ${@})

ClientId=$(aws cognito-idp create-user-pool-client \
    --user-pool-id $UserPoolId \
    --client-name serverless-memo-app \
    --query "UserPoolClient.ClientId" \
    --output text \
    ${@})

LongUserPoolId="cognito-idp.us-east-1.amazonaws.com/$UserPoolId"

aws cognito-identity create-identity-pool \
  --identity-pool-name serverless_memo_pool \
  --no-allow-unauthenticated-identities \
  --cognito-identity-providers "ProviderName=$LongUserPoolId,ClientId=$ClientId" \
  ${@}

