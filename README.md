RegExp (2014)
=============
Erstellt eine einzelne HTML Datei die zum Anwenden von regulären Ausdrücken auf
beliebige Daten verwendet werden kann.

Installation
------------
> git clone https://github.com/f-fly/RegExp && cd RegExp && make

Benutzung
---------
Die Daten werden entweder per copy/paste in das Programm eingeführt oder per
drag/drop in den Browser geschoben.

Auf die Daten wird dann ein regulärer Ausdruck angewendet, der für jedes
Auftreten des Ausdrucks eine JavaScript Funktion aufruft.

Diese Funktion gibt normalerweise den Text aus, auf den der Ausdruck zutrifft,
kann aber bearbeitet werden, wenn der Ausdruck zu den Favoriten hinzugefügt
wird.

Parser
------
In der JavaScript Funktion kann über das Schlüsselwort this auf ein Objekt 
zugegriffen werden, welches Interaktionen mit dem Programm ermöglicht. Dieses 
Objekt besitzt folgende Funktionen:

this.key(): Liefert die aktuelle Position

this.item(n): Liefert den Wert für die entsprechende Klammer des Ausdrucks, 0
entspricht dem kompletten Ausdruck

this.data(name, [wert]): Kann benutzt werden, um Daten zu speichern um in einer
späteren Funktion darauf zuzugreifen

this.length(): Liefert die Anzahl, wie oft der Ausdruck in den Daten gefunden
wurde

this.row(n): Liefert eine andere Fundstelle, auf Werte wird wie bei item(n)
zugegriffen

this.write(s): Eine Zeile ins Ergebnisfeld schreiben

Beispielparser
--------------
In den Daten sei eine Liste, die einzelne Beträge in EUR enthält. Der reguläre
Ausdruck wäre in diesem Fall

> (\d+) EUR

Ein Parser, der alle diese Summen findet, sie zusammenzählt und am Ende die
Summe ausgibt

```
// Initialisieren
if(this.key() == 0) {
  this.data("summe", 0);
}
 
// Eigentliche Funtion
var neue_summe = this.data("summe") + parseInt(this.item(1));
this.data("summe", neue_summe);

// Am Ende ausgeben
if(this.key() == this.length() - 1) {
  this.write("Summe: " + this.data("summe"));
}
```
