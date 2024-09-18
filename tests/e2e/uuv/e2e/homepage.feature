Feature: Homepage

  Scenario: Search - Successful case
    When I visit path "/fr"
    Then I should see a title named "Escape Game - Really Inaccessible"