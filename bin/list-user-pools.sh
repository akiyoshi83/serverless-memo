echo "---------- UserPools ----------"
aws cognito-idp list-user-pools \
    --max-results 10 \
    --query "UserPools[].[Id, Name]" \
    --output text \
    ${@}

echo
echo "---------- IdentityPools ----------"
aws cognito-identity list-identity-pools \
    --max-results 10 \
    --query "IdentityPools[].[IdentityPoolId, IdentityPoolName]" \
    --output text \
    ${@}

