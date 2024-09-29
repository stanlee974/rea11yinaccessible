Feature: Abri

  Background:
    Given I visit path "/fr/abri/entrance?isA11yMode=true"

  Scenario: Entrance
     Then within the element with selector "#currentModal"
     And I should see a button named "Continuer la suite"

  Scenario: Reveal scenario
    When I click on button named "Continuer la suite"
    Then I should see a title named "L'abri Salle des alterations"    
     And I should see a title named "Scénario"
     And I should see a title named "Objectif"
     And I should see a spin button named "Contraste"
     And I should see a spin button named "Luminosité"
  