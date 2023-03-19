Feature: Create an agenda

    In order to have reminders on defined activities
    As an application user
    I should be able to create an agenda

    @critical
    Scenario: Successfully created an agenda
        Given an agenda's name
        When I create an agenda with the agenda's name
        Then the agenda should be part of my agendas

    Scenario: Can't create two agendas with the same name
        Given an agenda's name
        And I have created an agenda with the agenda's name
        When I try to create an agenda with the agenda's name
        Then I should be informed that an agenda with that name already exists
