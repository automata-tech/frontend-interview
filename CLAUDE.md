# Frontend Interview Project - Employee Directory

## Interview Guidance

### Getting Started
1. **Initial Setup**: Candidate runs `npm install` and `npm run dev`
2. **Brief Overview**: Explain the app purpose and basic functionality
3. **Point Out Obvious Issues**: Mention 1-2 console errors to get started
4. **Let Them Explore**: Allow candidate to discover and prioritize issues

### Interviewer Prompts by Level

#### For Junior Candidates:
- "I notice there are some console errors - could you take a look?"
- "The loading spinner seems to stay visible even after data loads"
- "Some of the buttons don't seem to be working"

#### For Mid-Level Candidates:
- "How would you handle form validation here?"
- "The layout seems to break on mobile - what would you do?"
- "What accessibility improvements would you make?"

#### For Senior Candidates:
- "What performance optimizations would you consider?"
- "Are there any potential race conditions you can identify?"
- "How would you improve the error handling strategy?"

### Success Criteria

#### Junior Level Success:
- Fixes 1-2 obvious console errors
- Makes broken functionality work
- Shows basic debugging skills

#### Mid Level Success:
- Identifies and fixes 3-5 bugs
- Demonstrates understanding of React patterns
- Shows awareness of accessibility and responsive design

#### Senior Level Success:
- Identifies 6+ issues including subtle ones
- Discusses architectural improvements
- Shows deep understanding of React performance and best practices
- Considers production readiness and maintainability

## Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Run tests
npm run test

# Type checking
npm run build  # Includes TypeScript compilation
```

## Additional Notes

- The application is intentionally over-engineered in some areas to create opportunities for refactoring discussions
- Some bugs are interdependent - fixing one might reveal another
- The codebase includes both modern React patterns and some legacy patterns for discussion
- Error boundaries are intentionally missing in some places
- Performance optimizations are deliberately omitted to test candidate knowledge

## Implemented Bugs Summary

### Junior Level Bugs (Most Obvious)
1. **Console Error**: Undefined `companyName` variable in Header component
2. **Broken Loading State**: Loading spinner never disappears (`isLoading || true`)
3. **Broken Form Submission**: Missing `preventDefault()` in EmployeeForm
4. **Missing Required Validation**: Form fields don't validate empty inputs
5. **Non-functional Buttons**: Edit and Delete buttons missing onClick handlers

### Mid Level Bugs (Moderate Complexity)
6. **Stale Data**: Missing cache invalidation in TanStack Query mutations
7. **Responsive Form**: Fixed grid layout breaks on mobile (`grid-cols-2` instead of responsive)
8. **Text Overflow**: Table cells don't truncate long text (emails, names)
9. **Fixed Width Issues**: Search filter has fixed width causing mobile overflow
10. **Missing Accessibility**: Buttons lack aria-labels and proper accessibility attributes
11. **Phone Formatting**: Phone numbers display without proper formatting

### Senior Level Bugs (Subtle & Advanced)
12. **Memory Leak**: Missing cleanup in useEffect event listeners
13. **Performance Issues**: Expensive filter operations on every render with console.log
14. **Server search**: typing in the search field causes the whole table to rerender
15. **CSS Layout Issues**: Fixed width table headers cause horizontal scroll
16. **Error Handling**: Missing error boundaries and null checks in utility functions
17. **Type Safety**: Missing proper TypeScript validation in utility functions
18. **Validation Logic**: Weak email validation and missing input sanitization

### Performance & Architecture Issues
19. **No Debouncing**: Search triggers on every keystroke
20. **Missing Memoization**: Filter operations not optimized
21. **Improper useQuery**: Missing proper error states and loading management
22. **CSS Specificity**: Potential styling conflicts with fixed widths

## Interview Success Tips

1. **Start with Console**: Always check browser console first
2. **Test Functionality**: Click through all features to identify broken ones
3. **Check Responsiveness**: Test on different screen sizes
4. **Accessibility**: Use keyboard navigation and screen reader testing
5. **Performance**: Look for unnecessary re-renders and expensive operations
6. **Code Quality**: Identify type safety issues and architectural problems