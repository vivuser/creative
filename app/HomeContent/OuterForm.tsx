"use client"
import React from 'react'

interface Actress {
    id: number;
    name: string;
    selected: boolean;
    movies: {
      id: number;
      title: string;
      selected: boolean;
      details: {
        year: number;
        director: string;
        rating: number;
      };
    }[];
  }


const OuterForm = () => {
    const [actresses, setActresses] = React.useState<Actress[]>([
        {
          id: 1,
          name: 'Meryl Streep',
          selected: false,
          movies: [
            {
              id: 101,
              title: 'The Devil Wears Prada',
              selected: false,
              details: { year: 2006, director: 'David Frankel', rating: 6.9 }
            },
            {
              id: 102,
              title: 'Sophie\'s Choice',
              selected: false,
              details: { year: 1982, director: 'Alan J. Pakula', rating: 7.5 }
            }
          ]
        },
        {
          id: 2,
          name: 'Cate Blanchett',
          selected: false,
          movies: [
            {
              id: 201,
              title: 'Blue Jasmine',
              selected: false,
              details: { year: 2013, director: 'Woody Allen', rating: 7.3 }
            },
            {
              id: 202,
              title: 'Carol',
              selected: false,
              details: { year: 2015, director: 'Todd Haynes', rating: 7.2 }
            }
          ]
        }
      ]);

      const toggleActress = (actressId: number) => {
        setActresses((prev) => prev.map(actress => 
            actress.id  === actressId 
            ? { ...actress, selected : !actress.selected }
            : actress
        ));    
    };


    const toggleMovie = (actressId: number, movieId: number) => {
        setActresses(prev => prev.map(actress => {
          if (actress.id !== actressId) return actress;
          
          return {
            ...actress,
            movies: actress.movies.map(movie =>
              movie.id === movieId
                ? { ...movie, selected: !movie.selected }
                : movie
            )
          };
        }));
      };

      return (
        <div className="p-6 max-w-md bg-white rounded-xl shadow-md space-y-4">
          <h2 className="text-2xl font-bold text-gray-800">select</h2>
          
          <div className="space-y-3">
            {actresses.map(actress => (
              <div key={actress.id} className="space-y-2">
                <label className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={actress.selected}
                    onChange={() => toggleActress(actress.id)}
                    className="form-checkbox h-5 w-5 text-blue-600 rounded focus:ring-blue-500"
                  />
                  <span className="text-lg font-medium text-gray-700">{actress.name}</span>
                </label>
    
                {actress.selected && (
                  <div className="ml-8 space-y-2">
                    {actress.movies.map(movie => (
                      <div key={movie.id} className="space-y-1">
                        <label className="flex items-center space-x-3">
                          <input
                            type="checkbox"
                            checked={movie.selected}
                            onChange={() => toggleMovie(actress.id, movie.id)}
                            className="form-checkbox h-4 w-4 text-purple-600 rounded focus:ring-purple-500"
                          />
                          <span className="text-gray-700">{movie.title}</span>
                        </label>
    
                        {movie.selected && (
                          <div className="ml-8 p-2 bg-gray-50 rounded">
                            <p><span className="font-medium">Year:</span> {movie.details.year}</p>
                            <p><span className="font-medium">Director:</span> {movie.details.director}</p>
                            <p><span className="font-medium">Rating:</span> {movie.details.rating}/10</p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      );
    };
    
    export default OuterForm;
