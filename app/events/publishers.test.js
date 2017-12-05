import { receive } from 'pub-sub-es6'
import * as types from './types';
import * as publishers from './publishers';

export default createSuite('Publishers', () => {
  var dispatched = false;

  beforeEach(() => {
    dispatched
  });

  it('emits APP_READY', () => {
    receive(types.APP_READY, () => {
        dispatched = true;
    });
    publishers.emitAppReady();
    expect(dispatched).toBe(true);
  });

  it('emits TOGGLE_SETTINGS', () => {
    receive(types.TOGGLE_SETTINGS, () => {
        dispatched = true;
    });
    publishers.emitSettingsToggle();
    expect(dispatched).toBe(true);
  });

  it('emits TOGGLE_CONTENT_VIEW', () => {
    receive(types.TOGGLE_CONTENT_VIEW, () => {
        dispatched = true;
    });
    publishers.emitContentViewToggle();
    expect(dispatched).toBe(true);
  });

  it('emits OPEN_MEDIA_REEL', () => {
    receive(types.OPEN_MEDIA_REEL, () => {
        dispatched = true;
    });
    publishers.emitMediaReelOpen();
    expect(dispatched).toBe(true);
  });

  it('emits THREAD_OPEN', () => {
    receive(types.THREAD_OPEN, () => {
        dispatched = true;
    });
    publishers.emitThreadOpen();
    expect(dispatched).toBe(true);
  });

  it('emits THREAD_CLOSE', () => {
    receive(types.THREAD_CLOSE, () => {
        dispatched = true;
    });
    publishers.emitThreadClose();
    expect(dispatched).toBe(true);
  });

  it('emits THREAD_MOVE', () => {
    receive(types.THREAD_MOVE, () => {
        dispatched = true;
    });
    publishers.emitThreadMove();
    expect(dispatched).toBe(true);
  });

  it('emits SUB_HEADER_TOGGLE', () => {
    receive(types.SUB_HEADER_TOGGLE, () => {
        dispatched = true;
    });
    publishers.emitSubHeaderToggle();

    expect(dispatched).toBe(true);
  });

  it('emits RESET_BOARD', () => {
    receive(types.RESET_BOARD, () => {
        dispatched = true;
    });
    publishers.emitBoardReset();
    expect(dispatched).toBe(true);
  });

  // it('emits MODAL_OPEN', () => {
  //   receive(types.MODAL_OPEN, () => {
  //       dispatched = true;
  //   });
  //   publishers.emitModalOpen();
  //   expect(dispatched).toBe(true);
  // });

  // it('emits MODAL_CLOSE', () => {
  //   receive(types.MODAL_CLOSE, () => {
  //       dispatched = true;
  //   });
  //   publishers.emitModalClose();
  //   expect(dispatched).toBe(true);
  // });

  it('emits SHRINK_HEADER', () => {
    receive(types.SHRINK_HEADER, () => {
        dispatched = true;
    });
    publishers.emitHeaderShrink();
    expect(dispatched).toBe(true);
  });

  it('emits EXPAND_HEADER', () => {
    receive(types.EXPAND_HEADER, () => {
        dispatched = true;
    });
    publishers.emitHeaderExpand();
    expect(dispatched).toBe(true);
  });

  it('emits HEADER_TOGGLED', () => {
    receive(types.HEADER_TOGGLED, () => {
        dispatched = true;
    });
    publishers.emitHeaderToggled();
    expect(dispatched).toBe(true);
  });

  it('emits OPEN_HEADER_PANEL', () => {
    receive(types.OPEN_HEADER_PANEL, () => {
        dispatched = true;
    });
    publishers.emitOpenHeaderPanel();
    expect(dispatched).toBe(true);
  });

  it('emits CLOSE_HEADER_PANEL', () => {
    receive(types.CLOSE_HEADER_PANEL, () => {
        dispatched = true;
    });
    publishers.emitCloseHeaderPanel();
    expect(dispatched).toBe(true);
  });

  it('emits UPDATE_WATCH_ENTITY', () => {
    receive(types.UPDATE_WATCH_ENTITY, () => {
        dispatched = true;
    });
    publishers.emitUpdateWatchEntity();
    expect(dispatched).toBe(true);
  });

  it('emits POST_TOGGLE', () => {
    receive(types.POST_TOGGLE, () => {
        dispatched = true;
    });
    publishers.emitPostToggle();
    expect(dispatched).toBe(true);
  });

  it('emits THEME_CHANGE', () => {
    receive(types.THEME_CHANGE, () => {
        dispatched = true;
    });
    publishers.emitThemeChange();
    expect(dispatched).toBe(true);
  });

  it('emits OPEN_CONTEXT_MENU', () => {
    receive(types.OPEN_CONTEXT_MENU, () => {
        dispatched = true;
    });
    publishers.emitContextMenuOpen();
    expect(dispatched).toBe(true);
  });

  it('emits CLOSE_CONTEXT_MENU', () => {
    receive(types.CLOSE_CONTEXT_MENU, () => {
        dispatched = true;
    });
    publishers.emitContextMenuClose();
    expect(dispatched).toBe(true);
  });

});
