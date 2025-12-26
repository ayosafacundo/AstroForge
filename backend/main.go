package main

import "fmt"

type Point struct {
	x int
	y int
}

func main() {
	var x [100]Point
	for i := 0; i < 10; i++ {
		for j := 0; j < 10; j++ {
			x[i*j+i] = Point{i, j}
		}
	}
	for j := 0; j < 100; j++ {
		fmt.Println(x[j])
	}

}