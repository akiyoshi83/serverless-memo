aws cognito-idp list-user-pools \
    --max-results 10 \
    --query "UserPools[].[Id, Name]" \
    --output text \
    ${@}

