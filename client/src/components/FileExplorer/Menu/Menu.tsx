export const Menu: React.FC<{
  x: number;
  y: number;
  onRemove: () => void;
}> = ({ x, y, onRemove }) => (
  <div style={{ position: "absolute", top: y, left: x }}>
    <ul>
      <li onClick={onRemove}>Remove</li>
    </ul>
  </div>
);
