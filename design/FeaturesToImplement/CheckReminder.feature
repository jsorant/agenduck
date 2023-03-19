Feature: Check a reminder

    In order to have reminders on defined activities
    As an application user
    I should be able to check a reminder

    Background: An agenda and an activity have been created and a reminder has been added
        Given a date
        And an agenda's name
        And an activity's name
        And an address
        And a recurrence
        And I have created an agenda with the agenda's name
        And I have created an activity with the activity's name
        And I have added a reminder on this activity in the agenda

    @critical
    Scenario: Successfully checked a reminder should remove it from uncheked reminders
        When I check this reminder
        Then the reminder should not be part of the agenda's unchecked reminders anymore

    @critical
    Scenario: Successfully checked a reminder should create a new reminder based on the activity's recurrence
        When I check this reminder
        Then a new reminder should be part of the agenda's unchecked reminders and its date should match with the activity's recurrence

    Scenario: Cannot check a reminder that has already been checked
        And I have checked this reminder
        When I try to check this reminder
        Then I should be informed that this reminder is already checked