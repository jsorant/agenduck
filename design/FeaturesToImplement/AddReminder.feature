Feature: Add a reminder

    In order to have reminders on defined activities
    As an application user
    I should be able to add a reminder

    Background: An agenda and an activity have been created
        Given an agenda's name
        And an activity's name
        And an address
        And a recurrence
        And I have created an agenda with the agenda's name
        And I have created an activity with the activity's name

    @critical
    Scenario: Successfully added a reminder
        Given a date
        When I add a reminder on this activity in the agenda
        Then the reminder should be part of the agenda's unchecked reminders

    Scenario: Can create two identical reminders
        Given a date
        And I have added a reminder on this activity in the agenda
        When I add a reminder on this activity in the agenda
        Then both reminders should be part of the agenda's unchecked reminders
