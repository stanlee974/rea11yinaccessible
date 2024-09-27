Feature: Waiting room

  Background:
    Given I visit path "/fr/waitingroom"

  Scenario: Landigng with teaser
    Then I should see an element with content "Le temps presse, regarde la vidéo pour comprendre la situation..."
     And I should see a button named "Continuer"

  Scenario: Reveal scenario
    When I click on button named "Continuer"
    Then I should not see a button named "Continuer"
     And I set timeout with value 60000
     And I should see a title named "Bienvenu(e) à toi !"
     And I should see a title named "Scénario"
     And I should see a title named "Objectif"
     And I should see a link named "ici"
     And I should see a button named "Continuer"

  Scenario: Go to abri
    When I click on button named "Continuer"
     And I set timeout with value 80000
     And I click on element with role "link" and name "ici"
     And I reset context
    Then within the element with selector "#currentModal"
     And I should see a button named "Continuer la suite"
