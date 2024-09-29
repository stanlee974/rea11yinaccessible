Feature: Homepage

  Background:
    Given I visit path "/fr?isA11yMode=true"

  Scenario: Homepage
    Then I should see a title named "Bienvenue sur Rea11y Inaccessible"
     And I should see a title named "Contexte"
     And I should see a title named "Thématiques abordées"
     And I should see a title named "Conseils"
     And I should see a button named "Débuter la partie"

  Scenario: Go to Waiting room
    When I click on button named "Débuter la partie"
    Then I should see an element with content "Le temps presse, regarde la vidéo pour comprendre la situation..."
     And I should see a button named "Continuer"
  