Feature: Create an activity

    In order to have reminders on defined activities
    As an application user
    I should be able to create an activity

    @critical
    Scenario: Successfully created an activity
        Given an activity's name
        And an address
        And a recurrence
        When I create an activity with the activity's name
        Then the activity should be part of my activities

    Scenario: Can create two activities with the same name
        Given an activity's name
        And an address
        And a recurrence
        And I have created an activity with the activity's name
        When I try to create an activity with the activity's name
        Then both activities should be part of my activities

    Scenario: Activity address is optionnal
        Given an activity's name
        And an address
        And a recurrence
        When I create an activity with the activity's name and without an address
        Then the activity should be part of my activities
