# Task 4 — Review the AWS setup (about 15 min)

`infra/` holds the infrastructure for the (fictional) study API: a CloudFormation stack, the CI
deploy policy, and the deploy workflow. The system holds health-related participant data. You have
just inherited it and there is no AWS account to log into for this exercise: this is a paper review.

## Write up, in `answers/task4.md`

1. **The five most serious problems, ranked.** For each: what, why it matters here, the fix.
2. **Pick your #1.** How would you roll the fix out to a live system with no outage and no lockout?
   What do you check before and after?
3. **You land on an EC2 box you've never seen.** What are the first five things you check
   (read-only), and why those?
4. **Scenario:** an outside contractor needs to see application logs to debug, but must not be
   able to see participant data. How do you set that up?
5. Anything you'd leave alone for now, and why.
