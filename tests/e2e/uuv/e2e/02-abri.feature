Feature: Abri

  Background:
    Given I visit path "/fr/abri/entrance?isA11yMode=true"

  Scenario: Entrance
     Then within the element with selector "#currentModal"
     And I should see a button named "Poursuivre"

  Scenario: Entrance - Reveal challenge
    When I click on button named "Poursuivre"
    Then I should see a title named "L'abri Salle des alterations"    
     And I should see a title named "Scénario"
     And I should see a title named "Objectif"
     And I should see a spin button named "Contraste"
     And I should see a spin button named "Luminosité"
     And I should see a button named "Ce bouton Vert n'est pas le second"
     And I should see a button named "Ce bouton Orange vient après le bouton Vert"
     And I should see a button named "Ce bouton Rose n'est jamais le premier ni le dernier"
     And I should see a button named "Ce bouton Jaune est immédiatement suivi par le bouton Rose"

  Scenario: Entrance - Resolve challenge
    When I click on button named "Poursuivre"
     And I should see a spin button named "Luminosité"
     And I click on button named "Ce bouton Jaune est immédiatement suivi par le bouton Rose"
     And I click on button named "Ce bouton Rose n'est jamais le premier ni le dernier"
     And I click on button named "Ce bouton Vert n'est pas le second"
     And I click on button named "Ce bouton Orange vient après le bouton Vert"
    Then within the element with selector "#currentModal"
     And I should see a button named "Poursuivre"

  Scenario: Computer - Reveal challenge
    When I click on button named "Poursuivre"
     And I should see a spin button named "Luminosité"
     And I click on button named "Ce bouton Jaune est immédiatement suivi par le bouton Rose"
     And I click on button named "Ce bouton Rose n'est jamais le premier ni le dernier"
     And I click on button named "Ce bouton Vert n'est pas le second"
     And I click on button named "Ce bouton Orange vient après le bouton Vert"
     And I click on button named "Poursuivre"
    Then I should see a title named "L'abri Salle de controle"
     And I should see a title named "Scénario"
     And I should see a title named "Objectif"
     And within the element with selector "#currentModal"
     And I should see a button named "Poursuivre"