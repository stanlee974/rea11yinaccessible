Feature: Abri

  Background:
    Given I visit path "/fr/abri/entrance"

  Scenario: Entrance
     Then within the element with selector "#currentModal"
     And I should see a button named "Continuer la suite"

  Scenario: Reveal scenario
    When I click on button named "Continuer la suite"
    Then I should see a title named "L'abri Salle des alterations"    
     And I should see a title named "Scénario"
     And I should see a title named "Objectif"
     And I set timeout with value 180000
     And I should see a spin button named "Contraste"
     And I should see a spin button named "Luminosité"
  