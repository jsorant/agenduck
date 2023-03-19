Feature: Create an agenda

    In order to have reminders on defined activities
    As an application user
    I should be able to create an agenda

    @critical
    Scenario: Successfully created an agenda
        Given an agenda's name
        And a user
        When I create an agenda with the agenda's name for that user
        Then the agenda should be part of that user's agendas

    Scenario: Can't create two agendas with the same name for the same user
        Given an agenda's name
        And a user
        And I have created an agenda with the agenda's name for that user
        When I create an agenda with the agenda's name for that user
        Then I should be informed that an agenda with that name already exists for that user
