import * as d3 from 'd3';
import { useRef, useEffect } from 'react';
import { nodes, links, MANY_BODY_STRENGTH } from './data';
import './OrganizationGraphDiagram.css';

export const OrganizationGraphDiagram = () => {
  const ref = useRef();

  useEffect(() => {

    // const nodes = [{ id: 'Alice' }, { id: 'Bob' }, { id: 'Carol' }];
    
    // const links = [
    //   { source: 0, target: 1 }, // Alice → Bob
    //   { source: 1, target: 2 }, // Bob → Carol
    // ];
    
    const svg = d3.select(ref.current);
    const width = +svg.attr('width');
    const height = +svg.attr('height');
    const centerX = width / 2;
    const centerY = height / 2;
    
    const simulation = d3.forceSimulation(nodes)
      .force('charge', d3.forceManyBody().strength(MANY_BODY_STRENGTH))
      .force('link', d3.forceLink(links).distance(link => link.distance))
      .force('center', d3.forceCenter(centerX, centerY));

    const dragInteraction = d3.drag().on('drag', (event, node) => {
      node.fx = event.x;
      node.fy = event.y;
      simulation.alpha(1);
      simulation.restart();
    });
       
    const lines = svg
      .selectAll('line')
      .data(links)
      .enter()
      .append('line')
      .attr('stroke', (link) => link.color || 'black');

    const circles = svg
    .selectAll('circle')
    .data(nodes)
    .enter()
    .append('circle')
    .attr('fill', (node) => node.color || 'gray')
    .attr('r', node => node.size)
    .call(dragInteraction);

    const text = svg
    .selectAll('text')
    .data(nodes)
    .enter()
    .append('text')
    .attr('text-anchor', 'middle')
    .attr('dominant-baseline', 'middle')
    .style('pointer-events', 'none')
    .text(node => node.id);
    
    simulation.on('tick', () => {
      circles.attr('cx', (node) => node.x).attr('cy', (node) => node.y);
      text.attr('x', (node) => node.x).attr('y', (node) => node.y);
      lines
        .attr('x1', (link) => link.source.x)
        .attr('y1', (link) => link.source.y)
        .attr('x2', (link) => link.target.x)
        .attr('y2', (link) => link.target.y);
    });

  }, []);


  return (
    <svg id="container" width="960" height="960" ref={ref}>

    </svg>
  );
}





/*

// Organization Graph Diagram (with React and D3)
import * as d3 from 'd3';
import { useRef, useEffect } from 'react';

const nodes = [
  {"id": "Alice"},
  {"id": "Bob"},
  {"id": "Carol"},
];

const links = [
  {"source": 0, "target": 1}, // Alice -> Bob
  {"source": 1, "target": 1}, // Bob -> Carol
]

const simulation = d3.forceSimulation(nodes)
  .force("charge", d3.forceManyBody())
  .force("link", d3.forceLink(links))
  .force("center", d3.forceCenter());

simulation.on('tick', () => {
  console.log('tick');
});

export const OrganizationGraphDiagram = () => {
  const ref = useRef();

  useEffect(() => {
    const svg = d3.select(ref.current);
    svg.selectAll('circle').data(nodes).enter().append('circle');

  }, []);

  return (
    <svg id="container" width="960" height="500" ref={ref}>

    </svg>
  );
}

*/