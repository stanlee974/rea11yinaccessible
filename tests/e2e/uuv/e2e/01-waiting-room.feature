Feature: Waiting room

  Background:
    Given I visit path "/fr/waitingroom?isA11yMode=true"

  Scenario: Landigng with teaser
    Then I should see an element with content "Le temps presse, regarde la vidéo pour comprendre la situation..."
     And I should see a button named "Continuer"

  Scenario: Reveal scenario
    When I click on button named "Continuer"
    Then I should not see a button named "Continuer"
     And I should see a title named "Bienvenu(e) à toi !"
     And I should see a title named "Scénario"
     And I should see a title named "Objectif"
     And I should see a link named "ici"
     And I should see a button named "Continuer"

  Scenario: Go to abri
    When I click on button named "Continuer"
     And I click on link named "ici"
     And I reset context
    Then within the element with selector "#currentModal"
     And I should see a button named "Poursuivre"
