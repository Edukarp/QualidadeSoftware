Feature: Testando API Pokemon.

Background: Executa antes de cada teste
    * def url_base = 'https://pokeapi.co/api/v2/'
    * def url_base_pokemon = 'https://pokeapi.co/api/v2/pokemon/'

Scenario: Testando retorno
        Given url 'https://pokeapi.co/api/v2/pokemon/pikachu' 
        When method get
        Then status 200

Scenario: Testando retorno pokemon invalido
        Given url 'https://pokeapi.co/api/v2/pokemon/chocolate'
        When method get
        Then status 404

Scenario: Testando retorno pikachu e verificando JSON
        Given url url_base
        And path 'pokemon/pikachu'
        When method get
        Then status 200
        And match response.name == "pikachu"
        And match response.id == 25

Scenario: Testando retorno Pokemon Red, entrando em um dos elementos do array de idiomas e testando o JSON
        Given url url_base
        And path 'version/1/'
        When method get
        Then status 200
        And def idioma = $.names[5].language.url
        And print idioma
        And url idioma
        When method get
        Then status 200
        And match response.name == "es"
        And match response.id == 7

#Presença caso 1
Scenario: Testando retorno do move Water Gun do Pokemon Totodile
        Given url url_base_pokemon
        And path 'totodile'
        When method get
        Then status 200
        And match response.name == "totodile"
        And match response.id == 158
        And def move = $.moves[13].move.url
        And print move 
        And url move
        When method get
        Then status 200
        And match response.name == "water-gun"

#Presença caso 2
Scenario: Testando retorno do pokemon Quaxly com habilidade Moxie
        Given url url_base_pokemon
        And path 'quaxly'
        When method get
        Then status 200
        And match response.name == "quaxly"
        And match response.id == 912
        And def ability = $.abilities[1].ability.url
        And print ability
        And url ability
        When method get
        Then status 200
        And match response.name == "moxie"

#Presença caso 3
Scenario: Testando retorno do pokemon com cor invalida
    Given url url_base 
    And path 'pokemon-color/20/'
    When method get
    Then status 404
