Feature: GraphQL requests return sensible things

  Scenario: NockSlots UI loads and shows welcome message
    Given I open the local dev server
    Then I see the welcome message from GraphQL

  Scenario: Sending a number to the queue results in a predictable response
    Given I open the local dev server
    When I type in a number into the form
    And I press Send to Queue
    Then I see the correct number and an associated response